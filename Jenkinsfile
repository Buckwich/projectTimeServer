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
    stage('Clean') {
      steps {
        cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, cleanupMatrixParent: true, deleteDirs: true)
      }
    }
    stage('Deploy') {
      steps {
        sshagent(credentials: ['sshBuckwich']) {
          sh 'ssh -o StrictHostKeyChecking=no -l simon buckwich.de uname -a'
        }
        
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    HOME = '.'
  }
}