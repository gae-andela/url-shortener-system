@DirtyContextAfter @auth @sign-in
Feature: the user can login
  Scenario: client cannot login with bad inputs
    Given the server is up
    When the client sign in with
      | email     | bad-email.com   |
      | password  | test            |
    Then the client receives status code of 401
    And the client receives body field "message" of "Authentication Error"

  Scenario: client cannot sign in with unknown email
    Given the server is up
    When the client sign in with
      | email     | unknown@xyz.com |
      | password  | test            |
    Then the client receives status code of 401
    And the client receives body field "errors[0]" of "Invalid username/password"

  Scenario: client cannot sign in with bad password
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | test            |
    Then the client receives status code of 401
    And the client receives body field "errors[0]" of "Invalid username/password"

  Scenario: client can sign with valid email and password
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | root            |
    Then the client receives status code of 200
    And the client register token
