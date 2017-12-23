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
    stage('Deploy') {
      steps {
        sh '''ls -la
ssh simon@buckwich.de'''
      }
    }
  }
}