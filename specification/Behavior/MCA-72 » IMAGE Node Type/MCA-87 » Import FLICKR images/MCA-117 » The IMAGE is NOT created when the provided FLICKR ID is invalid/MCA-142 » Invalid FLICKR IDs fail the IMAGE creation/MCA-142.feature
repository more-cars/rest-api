@REQ_MCA-87
Feature: Import FLICKR images
  As an API contributor\
  I want to import FLICKR images via their ID\
  So I don't have to fill out all fields manually

  @RULE_MCA-117
  Rule: The IMAGE is NOT created when the provided FLICKR ID is invalid

    @TEST_MCA-142
    Scenario: Invalid FLICKR IDs fail the IMAGE creation
      When the user tries to create an "IMAGE" with the following data
        | _key_          | _value_ |
        | image_platform | flickr  |
        | external_id    | ABCDE   |
      Then the response should return with status code 422
