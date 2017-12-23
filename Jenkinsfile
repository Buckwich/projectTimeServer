pipeline {
  agent {
    docker {
      image 'node'
      args '-p 127.0.0.1:3000:3000 -v /etc/passwd:/etc/passwd\''
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
            timeout(unit: 'SECONDS', time: 3) {
              sh 'node bin/www'
            }
            
          }
        }
        stage('stop') {
          steps {
            timeout(time: 3, unit: 'SECONDS') {
              input 'Finished staging?'
            }
            
            sh 'pkill --signal SIGINT node'
          }
        }
      }
    }
    stage('Deploy') {
      environment {
        HOME = '/home/jenkins'
      }
      steps {
        sshagent(credentials: ['sshBuckwich']) {
          sh 'ssh simon@buckwich.de uname -a'
        }
        
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    HOME = '.'
  }
}