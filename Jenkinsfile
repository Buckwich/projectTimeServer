pipeline {
  agent {
    docker {
      args '-p 127.0.0.1:3000:3000'
      image 'node'
    }
    
  }
  stages {
    stage('Validate') {
      steps {
        sh 'npm -v'
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
        stage('start') {
          environment {
            DEBUG = '*'
          }
          steps {
            sh 'ls -la'
            sh 'node bin/app.js'
          }
        }
        stage('stop') {
          steps {
            input 'kill?'
            sh 'top'
            sh 'pkill --signal SIGINT node'
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
    NODE_ENV = 'production'
    HOME = '.'
  }
}