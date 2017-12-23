pipeline {
  agent {
    docker {
      image 'node'
      args '-p 127.0.0.1:3000:3000'
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
            DEBUG = 'app:*'
          }
          steps {
            timeout(unit: 'HOURS', time: 3) {
              sh 'node bin/www'
            }
            
          }
        }
        stage('stop') {
          steps {
            timeout(time: 3, unit: 'HOURS') {
              input 'Finished staging?'
            }
            
            sh 'pkill --signal SIGINT node'
          }
        }
      }
    }
    stage('Deploy') {
      steps {
        ws(dir: '/home/jenkins') {
          sh 'ls -la'
        }
        
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    HOME = '.'
  }
}