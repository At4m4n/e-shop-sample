# E-shop-sample
Used technologies:

#### Backend:
 * Java 8
 * Spring Framework
 * Spring Boot 2
 * MySQL
 * Stripe API
 * Maven
 
#### Frontend:
 * ReactJS
 * React Bootstrap 
 * Redux


# Local launch guide

1. Configure MySQL connection details in `application.yaml`.
2. Define available Stripe API **secret key** value in `application.yaml`.
3. Define available Stripe API **public key** value in `apiConstants.js`.
4. Execute `mvn clean package` in project root and ensure .jar file appeared in target folder. This will implicitly install Node JS and pack front-end into javascript bundle.
5. Run the .jar file(i.e. with `java -jar e-shop-sample-0.0.1-SNAPSHOT.jar` command).


If launched successfully, `/` endpoint will redirect you to `/product` and show products page.
