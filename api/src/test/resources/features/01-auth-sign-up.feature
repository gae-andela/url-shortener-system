@auth @sign-up
Feature: the user can authenticate
  Scenario: client cannot register with bad inputs
    Given the server is up
    When the client register with
      | firstName | Cucumber      |
      | lastName  | Work          |
      | email     | bad-email.com |
      | password  | test          |
    Then the client receives status code of 400
    And the client receives body field "message" of "Validation Errors"

  Scenario: client cannot register with used email
    Given the server is up
    When the client register with
      | firstName | Cucumber      |
      | lastName  | Work          |
      | email     | root@xyz.com |
      | password  | test          |
    Then the client receives status code of 400
    And the client receives body field "errors[0]" of "Email already exists"

  Scenario: client can register with new email
    Given the server is up
    When the client register with
      | firstName | Cucumber      |
      | lastName  | Work          |
      | email     | new@xyz.com |
      | password  | test          |
    Then the client receives status code of 201
    And the client register token
