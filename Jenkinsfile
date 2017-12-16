pipeline {
  agent {
    node {
      label 'docker'
    }
    
  }
  stages {
    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }
    stage('Verify Tools') {
      parallel {
        stage('node') {
          steps {
            sh 'npm -v'
          }
        }
        stage('docker') {
          steps {
            sh 'docker -v'
          }
        }
      }
    }
    stage('Build app') {
      steps {
        sh 'npm prune'
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Deploy') {
      steps {
        input 'Ready to deploy?'
        sh 'echo deployed'
      }
    }
    stage('Verify') {
      steps {
        input 'Everything good?'
      }
    }
  }
}