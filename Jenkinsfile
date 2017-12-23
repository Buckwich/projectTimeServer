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
        sh 'echo test'
      }
    }
    stage('Deploy') {
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
  environment {
    NODE_ENV = 'production'
    HOME = '.'
  }
}