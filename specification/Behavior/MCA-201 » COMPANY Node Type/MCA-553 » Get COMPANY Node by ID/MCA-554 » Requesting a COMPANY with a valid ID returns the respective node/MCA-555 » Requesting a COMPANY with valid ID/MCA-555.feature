@REQ_MCA-553
Feature: Get COMPANY Node by ID
  As an API consumer
  I want to be able to request a specific COMPANY
  So I can find out all the details about it when I only have its ID

  @RULE_MCA-554
  Rule: Requesting a COMPANY with a valid ID returns the respective node

    @TEST_MCA-555 @implemented
    Scenario: Requesting a COMPANY with valid ID
      Given there exists a "COMPANY" "Automobili Lamborghini S.p.A."
      When the user requests the "COMPANY" "Automobili Lamborghini S.p.A."
      Then the response should return with status code 200
      And the response should return the "COMPANY" "Automobili Lamborghini S.p.A."
