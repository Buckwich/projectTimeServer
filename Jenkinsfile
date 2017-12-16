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
            catchError() {
              sh 'node bin/app.js'
            }
            
            timeout(time: 3, unit: 'HOURS') {
              sh 'fgerds'
            }
            
          }
        }
        stage('stop') {
          steps {
            catchError() {
              input 'Stop staging?'
              sh 'pkill --signal SIGINT node'
            }
            
          }
        }
      }
    }
    stage('Clean') {
      steps {
        cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, cleanupMatrixParent: true, deleteDirs: true)
      }
    }
    stage('Deploy') {
      steps {
        catchError() {
          input 'Ready to deploy?'
          echo 'deploying'
        }
        
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    HOME = '.'
  }
}