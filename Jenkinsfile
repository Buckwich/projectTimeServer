pipeline {
  agent {
    docker {
      image 'node'
    }
    
  }
  stages {
    stage('build') {
      steps {
        sh 'npm --version'
        sh 'ls -la'
        sh 'hostname'
        sh 'npm install'
      }
    }
  }
}