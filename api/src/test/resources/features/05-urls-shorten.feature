@DirtyContextAfter @urls @shorten
Feature: a logged user can create short urls
  Scenario: anonymous cannot create short urls
    Given the server is up
    When the client shorten url with
      | longUrl     | https://amazon.com    |
    Then the client receives status code of 401

  Scenario: cannot create short urls with bad inputs
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | root            |
    And the client receives status code of 200
    And the client register token
    And the client shorten url with
      | shortUrl  | cust.root               |
    Then the client receives status code of 400

  Scenario: logged user can create short urls
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | root            |
    And the client receives status code of 200
    And the client register token
    And the client shorten url with
      | longUrl     | https://amazon.com    |
    Then the client receives status code of 201
    And the client receives body field "shortUrl" is null "false"

  Scenario: logged user can set custom short urls
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | root            |
    And the client receives status code of 200
    And the client register token
    And the client shorten url with
      | longUrl     | https://amazon.com    |
      | shortUrl    | test                  |
    Then the client receives status code of 201
    And the client receives body field "shortUrl" of "cust.test"

  Scenario: logged user cannot use already used custom urls
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | root            |
    And the client receives status code of 200
    And the client register token
    And the client shorten url with
      | longUrl     | https://another.com    |
      | shortUrl    | oth            |
    Then the client receives status code of 201
    And the client shorten url with
      | longUrl     | https://any.com    |
      | shortUrl    | oth            |
    Then the client receives status code of 400
