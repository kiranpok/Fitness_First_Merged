# Fitness-First

This is a website Application for a Activities Tracking. It's made by using Mern Stack for academic project.
## Vision Report

As we all know Health is wealth. In a world where being healthy and feeling good is important, our product wants to change how people think about staying healthy. For all the health-conscious individuals of all fitness levels and ages seeking a personalized approach to wellness, who recognize the importance of a comprehensive health and fitness solution that goes beyond exercise tracking. The Health Fitness application is an innovative health and fitness platform, that integrates personalized guidance and tracking features, encouraging users to achieve their health and fitness goals.  

## Objectives:  

For individuals who prioritize their well-being and are health-conscious, this application will help them to live healthier life through user-friendly health and fitness tracker. 

## Key Features  

#### 1. User Authentication
#### 2. Profile Update
#### 3. Creating/Updating/Deleting Activities 
#### 4. Creating/Updating/Deleting Goals
#### 5. Monitoring progress
#### 6. Recommendation


## Target Customer: 

Any individual who is conscious about their health, prioritizes being healthy, and wants to live a healthier lifestyle. 


## Differentiation with Competitors:  

Our application stands out by providing not only different activities options and activity tracking, setting goals, monitoring progress but also providing workout and nutrition recommendation features in user-friendly platform.  

## Risk Analysis:  

To make sure everything runs smoothly from development to launch, we’ve taken a good look at potential challenges. We’re actively dealing with things like technical issues, making sure people will easily adopt our web app, and handling any unexpected delays. Our team is all in to solve these challenges and make sure our web app launch is a success. 

## Measurement of Success: 

Succes for Fitness-First means more than just a smooth launch, we’ve really keeping an eye on how we’re making a positive impact on our users’ lives. We look at how much people are engaging with our web app, what they’re saying about it, and whether they’re reaching their health and fitness goals. This constant back and forth with our users helps us keep making the app better and better. 

## Continuous Improvement:  

We aim to conduct regular quality checks and take feedback to make sure our application aligns with user needs. Our team will collaborate and promise for continuous improvement throughout the application development lifecycle 

## Enhancements

To further enhance Fitness-First, we're implementing the following improvements:

- **Localization**: Making the application accessible to users in different regions by providing multilingual support:
  - Default Language: English (`en`)
  - Additional Languages:
    - Finnish (`fi`)
    - Nepali (`ne`)  
  UTF-8 encoding will be used for all supported languages.

- **Testing**:
  - *Functional Testing*: Ensuring all features work as expected using Unit Testing, Integration Testing, System Testing, and User Acceptance Testing. 
  - *Non-functional Testing*: Conducting Performance Testing, Security Testing, Usability Testing, and Compatability Testing.
### Software Architecture Diagrams

#### Entity-Relationship (ER) Diagram

![ER](https://github.com/kiranpok/Fitness_First_Merged/assets/144848601/37c2f087-57c5-4b2d-94fa-446da414bf14)



*Description*: The ER diagram illustrates the entities and relationships in the Fitness-First database schema, showing how different entities (e.g., users, activities, goals) are connected.



#### Sequence Diagram

![Sequence Diagrams](https://github.com/kiranpok/Fitness_First_Merged/assets/144848601/a861460f-2587-4e8f-a48a-937323a0c256)



*Description*: The sequence diagram depicts the interactions between various components/modules of the Fitness-First application during specific user scenarios (e.g., user goal setting, activity tracking).

#### Activity Diagram

![ActivityDiagramm](https://github.com/kiranpok/Fitness_First_Merged/assets/144848601/c64d985b-d5c7-4cf3-bc76-055d739065d7)

*Description*: The activity diagram outlines the flow of activities and user actions within Fitness-First, providing a visual representation of how users navigate through different features.

#### Deployment Diagram

![image](https://github.com/kiranpok/Fitness_First_Merged/assets/144848601/364aebd7-5563-49b1-a320-4faec2916388)


*Description*: The deployment diagram illustrates the physical deployment of software components (e.g., frontend, backend, database) across different nodes or servers in the Fitness-First system architecture.

#### Use Case Diagram

![Use-case](https://github.com/kiranpok/Fitness_First_Merged/assets/144848601/81a097a8-0a39-4856-ba11-116fd85acfd4)


*Description*: The use case diagram identifies various use cases (e.g., user authentication, goal management, activity tracking) and their relationships with different actors in the Fitness-First application.

  
- **Statistical Code Analysis**: Implementing static code analysis using `SonarLint` for continuous code quality improvement.
  
- **Documentation**: Enhancing documentation with API specifications, architecture overview, and user guides.

## Setup Instructions

To set up the Fitness-First-Pro project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/kiranpok/Fitness_First_Merged.git
   

2. **Navigate to the Project Directory:**
   ```bash
    cd fitness-first-pro 
  

3. **Install Backend Dependencies:**

   ```bash
    cd Backend
    npm install 

4. **Install Frontend Dependencies:**

    ```bash
    cd ../Frontend
    npm install

5. **Set Environment Variables:**
  Create a .env file in the root directory and configure your environment variables. For example:
    ```bash
    PORT=5000
    MONGODB_URI=<Your MongoDB connection string>

6. **Run the Backend:**
    ```bash
    cd Backend
    npm run dev

7. Run the Frontend:

  ```bash
    cd Frontend
    npm start
