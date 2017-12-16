pipeline {
  agent {
    docker 'node:6.3'
  }
  stages {
    stage('build') {
      steps {
        sh 'mkdir test'
        sh 'npm install'
        sh 'npm test'
      }
    }
  }
  environment {
    HOME = '.'
  }
}