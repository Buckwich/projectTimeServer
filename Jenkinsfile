pipeline {
  agent {
    docker {
      image 'docker pull node'
    }
    
  }
  stages {
    stage('build') {
      steps {
        sh '''npm install
'''
      }
    }
  }
}