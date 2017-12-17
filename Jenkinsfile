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
          steps {
            sh 'ls -la'
            timeout(unit: 'MINUTES', time: 1) {
              sh 'node bin/www'
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
  }
  environment {
    NODE_ENV = 'production'
    HOME = '.'
  }
}