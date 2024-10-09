pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/your-repo.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                // Example: sh 'make build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                // Example: sh 'make test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Example: sh 'make deploy'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
            // Example: cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
