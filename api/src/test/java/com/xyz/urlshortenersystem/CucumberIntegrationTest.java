package com.xyz.urlshortenersystem;

import org.junit.runner.RunWith;

import com.xyz.urlshortenersystem.features.BaseIntegrationTest;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = { "pretty", "html:target/cucumber-reports/index.html",
		"json:target/cucumber-reports/cucumber.json", "junit:target/cucumber-reports/cucumber.xml", }, features = "src/test/resources/features")
public class CucumberIntegrationTest extends BaseIntegrationTest {

}
