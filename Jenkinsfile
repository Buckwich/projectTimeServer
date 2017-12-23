pipeline {
  agent none
  stages {
    stage('Docker') {
      agent {
        docker {
          image 'node'
        }
        
      }
      steps {
        sh 'echo test'
      }
    }
    stage('Master') {
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
}