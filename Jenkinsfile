pipeline {
  agent {
    docker {
      image 'node'
    }
    
  }
  stages {
    stage('Docker') {
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