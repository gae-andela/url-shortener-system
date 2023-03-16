@DirtyContextAfter @auth @who
Feature: a logged user can fetch its details
  Scenario: anonymous cannot get details
    Given the server is up
    When the client get current user
    Then the client receives status code of 401
    And the client receives body field "message" of "Authentication Error"

  Scenario: logged user can fetch its details
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | root            |
    And the client receives status code of 200
    And the client register token
    And the client get current user
    Then the client receives status code of 200
    And the client receives body field "email" of "root@xyz.com"
    And the client receives body field "password" is null "true"
