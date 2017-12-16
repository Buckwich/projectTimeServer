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
            sh 'echo pm2'
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
      parallel {
        stage('Stage') {
          steps {
            echo 'Staged to stage.buckwich.de'
            sh 'pm2 start'
          }
        }
        stage('error') {
          steps {
            input 'Continue?'
            sh 'pm2 stop'
          }
        }
      }
    }
    stage('Verify') {
      steps {
        input 'Ready to deploy?'
        sh 'pm2 start bin/www -i 2'
      }
    }
  }
  environment {
    HOME = '.'
    NODE_ENV = 'production'
  }
}