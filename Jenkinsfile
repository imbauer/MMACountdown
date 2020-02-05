pipeline {
    agent any

    environment {
        OUTPUT = ''
    }
    stages {
        stage('Build docker image') {
            steps {
                sh '''
                    set +e
                    rm -R JenkinsMMACountdown
                    set -e
                '''
                sh 'git clone https://github.com/imbauer/JenkinsMMACountdown.git'
                sh 'ls MMACountdown'
                withCredentials([string(credentialsId: 'AWS_ACCOUNT_ID', variable: 'SECRET')]) { //set SECRET with the credential content
                    sh '''
                        set +e
                        docker build JenkinsMMACountdown/jenkins/ -t ${SECRET}.dkr.ecr.us-east-2.amazonaws.com/jenkins:latest
                        docker build JenkinsMMACountdown/nginx/ -t ${SECRET}.dkr.ecr.us-east-2.amazonaws.com/nginx:latest
                        set -e
                    '''
                }
            }
        }
        stage('AWS ECR Repositories') {
            agent {
                docker { image 'garland/aws-cli-docker' }
            }
            steps {
                withAWS(credentials:'push_docker_to_ecr') {
                    sh '''
                        set +e
                        aws ecr describe-repositories --repository-names jenkins --region us-east-2 && aws ecr delete-repository --force --repository-name jenkins --region us-east-2
                        aws ecr describe-repositories --repository-names jenkins --region us-east-2 || aws ecr create-repository --repository-name jenkins --region us-east-2
                        aws ecr describe-repositories --repository-names nginx --region us-east-2 && aws ecr delete-repository --force --repository-name nginx --region us-east-2
                        aws ecr describe-repositories --repository-names nginx --region us-east-2 || aws ecr create-repository --repository-name nginx --region us-east-2
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
                    sh 'docker push ${SECRET}.dkr.ecr.us-east-2.amazonaws.com/jenkins:latest'
                    sh 'docker push ${SECRET}.dkr.ecr.us-east-2.amazonaws.com/nginx:latest'
                }
                sh 'docker images'
            }
        }
    }
}