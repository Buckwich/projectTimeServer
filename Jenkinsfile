pipeline {
  agent {
    docker {
      image 'node'
    }
    
  }
  stages {
    stage('Checkout Code') {
      steps {
        checkout scm
        ws(dir: '/home/simon/projectTimeServer')
      }
    }
    stage('node') {
      steps {
        sh 'npm -v'
      }
    }
    stage('Build app') {
      steps {
        sh 'npm prune'
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Deploy') {
      steps {
        input 'Ready to deploy?'
        sh 'echo deployed'
      }
    }
    stage('Verify') {
      steps {
        input 'Everything good?'
      }
    }
  }
  environment {
    HOME = '.'
  }
}