@urls @redirect
Feature: any user can be redirected via short urls
  Scenario: anyone can be redirected
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | root            |
    And the client receives status code of 200
    And the client register token
    And the client shorten url with
      | longUrl     | https://amazon.com    |
    And the client receives status code of 201
    And the client remove token
    Then the client browses short url "response.shortUrl"
    Then the client receives status code of 302

  Scenario: cannot be redirected with bad url
    Given the server is up
    When the client browses short url "z"
    Then the client receives status code of 404

  Scenario: can browse custom short urls
    Given the server is up
    When the client sign in with
      | email     | root@xyz.com    |
      | password  | root            |
    And the client receives status code of 200
    And the client register token
    And the client shorten url with
      | longUrl     | https://amazon.com    |
      | shortUrl    | wonders               |
    And the client receives status code of 201
    And the client receives body field "shortUrl" of "cust.wonders"
    Then the client browses short url "cust.wonders"
    Then the client receives status code of 302
