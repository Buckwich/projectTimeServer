pipeline {
  agent {
    node {
      label 'master'
    }
    
  }
  stages {
    stage('Checkout') {
      steps {
        ws(dir: '/home/jenkins/projectTimeServer') {
          checkout scm
        }
        
      }
    }
    stage('Validate') {
      parallel {
        stage('node') {
          steps {
            sh 'npm -v'
          }
        }
        stage('pm2') {
          steps {
            sh 'pm2 -V'
          }
        }
      }
    }
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Stage') {
      steps {
        echo 'Staged to stage.buckwich.de'
        sh 'npm start'
      }
    }
    stage('Verify') {
      steps {
        input 'Ready to deploy?'
      }
    }
  }
  environment {
    HOME = '.'
    NODE_ENV = 'production'
  }
}