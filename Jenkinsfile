pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                // Clone the repository
                git 'https://github.com/krishnaprakashsvr/Employee_Add_Edit_Delete.git'
            }
        }
        stage('Build') {
            steps {
                // Run build commands
                echo 'Building the project...'
                // Example: sh 'mvn clean install' (if using Maven)
                // Example: sh './gradlew build' (if using Gradle)
            }
        }
        stage('Test') {
            steps {
                // Run test commands
                echo 'Running tests...'
                // Example: sh 'mvn test' (if using Maven)
                // Example: sh './gradlew test' (if using Gradle)
            }
        }
        stage('Deploy') {
            steps {
                // Run deploy commands
                echo 'Deploying the application...'
                // Example: sh 'scp target/*.jar user@server:/path/to/deploy' (if using SCP for deployment)
            }
        }
    }
    post {
        always {
            // Actions that run always, like cleanup
            echo 'Cleaning up...'
            // Example: cleanWs()
        }
        success {
            // Actions that run on success
            echo 'Pipeline succeeded!'
        }
        failure {
            // Actions that run on failure
            echo 'Pipeline failed!'
        }
    }
}
