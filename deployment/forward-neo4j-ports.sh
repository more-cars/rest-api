#!/bin/sh
# POSIX shell: automatically port-forwards all Neo4j services named 'api-db-service' in all namespaces
# Prints bookmark URLs, keeps running, and stops all port-forwards on termination

echo "Starting automatic Neo4j port-forwarding..."
tmpfile=$(mktemp)

# Cleanup function to stop all port-forwards
cleanup() {
    echo
    echo "Stopping all Neo4j port-forwards..."
    while read -r line; do
        pid=$(echo "$line" | cut -d' ' -f2)
        kill "$pid" 2>/dev/null
    done < "$tmpfile"
    rm -f "$tmpfile"
    exit 0
}

# Trap signals to call cleanup
trap cleanup INT TERM EXIT

# Iterate over all namespaces
kubectl get ns -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{end}' | while IFS= read -r ns; do
    [ -z "$ns" ] && continue

    # Check for service named 'api-db-service' in this namespace
    svc=$(kubectl -n "$ns" get svc api-db-service -o jsonpath='{.metadata.name}' 2>/dev/null || true)
    if [ -n "$svc" ]; then
        echo "Found Neo4j service '$svc' in namespace '$ns'. Starting port-forward..."

        # Start port-forward with random local ports for HTTP (7474) and Bolt (7687)
        kubectl -n "$ns" port-forward svc/"$svc" 0:7474 0:7687 > "port-forward-$ns.log" 2>&1 &

        pid=$!
        echo "$ns $pid" >> "$tmpfile"
    fi
done

# Give port-forwards a moment to initialize
sleep 2

# Print the mapping and bookmark URLs
echo
echo "Port-forwarding started. Check logs 'port-forward-<namespace>.log' for details."
echo "You can connect to the Neo4j Browser using these URLs:"

while IFS= read -r line; do
    ns=$(echo "$line" | cut -d' ' -f1)
    pid=$(echo "$line" | cut -d' ' -f2)
    log="port-forward-$ns.log"

    # Extract the local ports assigned
    http_port=$(grep "Forwarding from" "$log" | grep "7474" | awk '{print $3}' | cut -d: -f2)
    bolt_port=$(grep "Forwarding from" "$log" | grep "7687" | awk '{print $3}' | cut -d: -f2)

    echo
    echo "Namespace: $ns"
    echo "HTTP port: $http_port"
    echo "Bolt port: $bolt_port"
    echo "Bookmark URL for Neo4j Browser:"
    echo "  http://localhost:$http_port/browser/?connectURL=bolt://localhost:$bolt_port"
done < "$tmpfile"

# Keep the script running to maintain port-forwards
echo
echo "Port-forwards running in the background. Press Ctrl+C to stop."
while true; do
    sleep 60
done