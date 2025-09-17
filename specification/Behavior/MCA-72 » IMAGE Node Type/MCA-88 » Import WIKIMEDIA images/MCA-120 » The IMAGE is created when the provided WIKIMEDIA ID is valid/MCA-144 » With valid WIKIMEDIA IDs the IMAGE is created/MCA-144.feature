@REQ_MCA-88
Feature: Import WIKIMEDIA images
  As an API contributor\
  I want to import WIKIMEDIA images via their ID\
  So I don't have to fill out all fields manually

  @RULE_MCA-120
  Rule: The IMAGE is created when the provided WIKIMEDIA ID is valid

    @TEST_MCA-144 @ext_dependency
    Scenario: With valid WIKIMEDIA IDs the IMAGE is created
      When the user tries to create an "IMAGE" with the following data
        | _key_          | _value_                                    |
        | image_platform | wikimedia                                  |
        | external_id    | 1957 Hudson Hornet Super (37054215285).jpg |
      Then the response should return with status code 201
