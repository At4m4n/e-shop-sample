# Launch guide

1. Configure MySQL connection details in `application.yaml`.
2. Define available Stripe API **secret key** value in `application.yaml`.
3. Execute `mvn install` and run the .jar file(i.e. with `java -jar e-shop-sample-0.0.1-SNAPSHOT.jar` command) or simply launch `EShopSampleApplication.java` from IDE.


If launched successfully, `/product` endpoint will return products as json list.
