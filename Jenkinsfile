pipeline {
  agent {
    docker 'node:6.3'
  }
  stages {
    stage('build') {
      steps {
        sh 'npm --version'
        sh 'ls -la'
        sh 'hostname'
        sh 'sudo npm install'
      }
    }
  }
}