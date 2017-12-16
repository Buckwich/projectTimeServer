pipeline {
  agent {
    docker {
      args '-p 127.0.0.1:3000:3000'
      image 'keymetrics/pm2'
    }
    
  }
  stages {
    stage('validate tools') {
      parallel {
        stage('pm2') {
          steps {
            sh 'ls -la'
            sh 'pm2-docker -V'
            sh 'ls -la'
          }
        }
        stage('npm') {
          steps {
            sh 'npm -v'
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
        milestone 1
      }
    }
    stage('start') {
      environment {
        DEBUG = '*'
        HOME = ''
      }
      steps {
        sh 'ls -la'
        sh 'pm2-docker ./bin/app.js'
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
    NODE_ENV = 'production'
    HOME = '.'
  }
}