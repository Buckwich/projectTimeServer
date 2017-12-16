pipeline {
  agent {
    docker {
      args '-p 127.0.0.1:3000:3000'
      image 'keymetrics/pm2'
    }
    
  }
  stages {
    stage('validate tools') {
      steps {
        sh 'npm -v'
        sh 'pm2-docker -V'
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
        milestone 1
      }
    }
    stage('Stage') {
      parallel {
        stage('stop') {
          steps {
            input 'Continue with Deployment?'
            sh 'pm2 stop'
          }
        }
        stage('start') {
          steps {
            sh 'pm2-docker start bin/www -i 2'
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