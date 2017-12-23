pipeline {
  agent none
  stages {
    stage('Validate') {
      agent {
        docker {
          image 'node'
        }
        
      }
      steps {
        sh 'npm -v'
      }
    }
    stage('Build') {
      agent {
        docker {
          image 'node'
        }
        
      }
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      agent {
        docker {
          image 'node'
        }
        
      }
      steps {
        sh 'npm test'
        milestone 1
      }
    }
    stage('Stage') {
      parallel {
        stage('start') {
          agent {
            docker {
              image 'node'
              reuseNode true
              args '-p 127.0.0.1:3000:3000'
            }
            
          }
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
          agent {
            docker {
              image 'node'
              reuseNode true
            }
            
          }
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
      agent {
        node {
          label 'master'
        }
        
      }
      steps {
        sh 'ls -la'
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    HOME = '.'
  }
}