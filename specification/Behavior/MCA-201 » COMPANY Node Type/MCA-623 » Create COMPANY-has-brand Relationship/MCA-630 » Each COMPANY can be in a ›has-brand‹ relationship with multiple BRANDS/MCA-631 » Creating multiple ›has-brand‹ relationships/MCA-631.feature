@REQ_MCA-623
Feature: Create COMPANY-has-brand Relationship

  @RULE_MCA-630
  Rule: Each COMPANY can be in a ›has-brand‹ relationship with multiple BRANDS

    @TEST_MCA-631 @implemented
    Scenario: Creating multiple ›has-brand‹ relationships
      Given there exists a "COMPANY" "Volkswagen AG"
      And there exists a "BRAND" "VW"
      And there exists a "BRAND" "VW (Alternative)"
      When the user creates a "has-brand" relationship between "Volkswagen AG" and "VW"
      And the user creates a "has-brand" relationship between "Volkswagen AG" and "VW (Alternative)"
      Then there should exist a "has-brand" relationship between "Volkswagen AG" and "VW"
      And there should exist a "has-brand" relationship between "Volkswagen AG" and "VW (Alternative)"
