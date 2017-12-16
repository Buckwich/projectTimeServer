pipeline {
  agent {
    docker {
      image 'node'
      args '-p 127.0.0.1:3000:3000'
    }
    
  }
  stages {
    stage('install tools') {
      steps {
        sh 'npm install pm2'
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
        input 'ertg'
      }
    }
    stage('Stage') {
      parallel {
        stage('stop') {
          steps {
            input 'Continue with Deployment?'
            ws(dir: '/home/jenkins/projectTimeServer') {
              sh 'npm stop'
            }
            
          }
        }
        stage('start') {
          steps {
            sh 'ls node_modules/pm2'
            sh 'node_modules/pm2/bin/test'
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