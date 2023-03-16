@DirtyContextAfter @urls @read @remove
Feature: a logged user can fetch its urls and manage it
  Scenario: anonymous cannot get urls
    Given the server is up
    When the client fetch urls
    Then the client receives status code of 401

  Scenario: logged user can fetch urls
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | root            |
    And the client receives status code of 200
    And the client register token
    And the client fetch urls
    Then the client receives status code of 200
    And the client receives body field "[0].id" is null "false"
    And the client receives body field "[0].longUrl" is null "false"
    And the client receives body field "[0].shortUrl" is null "false"

  Scenario: anonymous cannot remove urls
    Given the server is up
    When the client removes url with ID "2"
    Then the client receives status code of 401

  Scenario: logged user can remove urls
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | root            |
    And the client receives status code of 200
    And the client register token
    When the client removes url with ID "2"
    Then the client receives status code of 204

  Scenario: anonymous cannot get urls stats
    Given the server is up
    When the client fetch stats of urls "1"
    Then the client receives status code of 401

  Scenario: logged user can get urls stats
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | root            |
    And the client receives status code of 200
    And the client register token
    And the client fetch urls
    Then the client receives status code of 200
    When the client fetch stats of urls "response.[0].id"
    Then the client receives status code of 200
    And the client receives body field "[0].id" of "1"
    And the client receives body field "[0].ip" of "0.0.0.0"
    