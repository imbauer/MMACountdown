pipeline {
    agent any

    environment {
        OUTPUT = ''
    }
    stages {
        stage('Build docker image') {
            steps {
                sh 'rm -R JenkinsMMACountdown'
                sh 'git clone https://github.com/imbauer/MMACountdown.git'
                sh 'ls JenkinsMMACountdown'
                withCredentials([string(credentialsId: 'AWS_ACCOUNT_ID', variable: 'SECRET')]) { //set SECRET with the credential content
                    sh 'docker build MMACountdown/client/ -t ${SECRET}.dkr.ecr.us-east-2.amazonaws.com/client:latest'
                    sh 'docker build MMACountdown/api/ -t ${SECRET}.dkr.ecr.us-east-2.amazonaws.com/api:latest'
                }
            }
        }
        stage('AWS ') {
            agent {
                docker { image 'garland/aws-cli-docker' }
            }
            steps {
                withAWS(credentials:'push_docker_to_ecr') {
                    sh '''
                        set +e
                        aws ecr describe-repositories --repository-names client --region us-east-2 && aws ecr delete-repository --force --repository-name client --region us-east-2
                        aws ecr describe-repositories --repository-names client --region us-east-2 || aws ecr create-repository --repository-name client --region us-east-2
                        aws ecr describe-repositories --repository-names api --region us-east-2 && aws ecr delete-repository --force --repository-name api --region us-east-2
                        aws ecr describe-repositories --repository-names api --region us-east-2 || aws ecr create-repository --repository-name api --region us-east-2
                        set -e
                    '''
                    script {
                        OUTPUT = sh(returnStdout: true, script: 'aws ecr get-login --no-include-email --region us-east-2')
                    }
                }
            }
        }
        stage('Check docker images') {
            steps {
                sh OUTPUT
                withCredentials([string(credentialsId: 'AWS_ACCOUNT_ID', variable: 'SECRET')]) { //set SECRET with the credential content
                    sh 'docker push ${SECRET}.dkr.ecr.us-east-2.amazonaws.com/client:latest'
                    sh 'docker push ${SECRET}.dkr.ecr.us-east-2.amazonaws.com/api:latest'
                }
                sh 'docker images'
            }
        }
    }
}