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
        stage('error') {
          steps {
            input 'Continue?'
            ws(dir: '/home/jenkins/projectTimeServer') {
              sh 'npm stop'
            }
            
          }
        }
        stage('drgf') {
          steps {
            ws(dir: '/home/jenkins/projectTimeServer') {
              sh '''npm install
npm run pm2'''
            }
            
          }
        }
        stage('ppm') {
          steps {
            sh 'cat \'12345678\'|su pm2'
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