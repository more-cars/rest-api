@REQ_MCA-87
Feature: Import FLICKR images
  As an API contributor\
  I want to import FLICKR images via their ID\
  So I don't have to fill out all fields manually

  @RULE_MCA-118
  Rule: The IMAGE is created when the provided FLICKR ID is valid

    @TEST_MCA-145 @ext_dependency
    Scenario: With valid FLICKR IDs the IMAGE is created
      When the user tries to create an "IMAGE" with the following data
        | _key_          | _value_     |
        | image_platform | flickr      |
        | external_id    | 54250906008 |
      Then the response should return with status code 201
