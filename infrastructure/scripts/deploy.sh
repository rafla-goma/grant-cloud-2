#!/bin/bash

# 設定
STACK_NAME="nextjs-app-stack"
TEMPLATE_FILE="../cloudformation/cloudformation-template.yml"
S3_BUCKET=""
CLOUDFRONT_DISTRIBUTION_ID=""

# CloudFormationスタックの作成または更新
update_stack() {
    if aws cloudformation describe-stacks --stack-name $STACK_NAME > /dev/null 2>&1; then
        echo "Updating stack..."
        aws cloudformation update-stack --stack-name $STACK_NAME --template-body file://$TEMPLATE_FILE --capabilities CAPABILITY_IAM
    else
        echo "Creating stack..."
        aws cloudformation create-stack --stack-name $STACK_NAME --template-body file://$TEMPLATE_FILE --capabilities CAPABILITY_IAM
    fi

    echo "Waiting for stack update to complete..."
    aws cloudformation wait stack-update-complete --stack-name $STACK_NAME
}

# S3バケット名とCloudFront Distribution IDの取得
get_resource_info() {
    S3_BUCKET=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text)
    CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDomainName'].OutputValue" --output text)
}

# Next.jsアプリケーションのビルドとデプロイ
build_and_deploy() {
    echo "Building Next.js application..."
    npm run build

    echo "Deploying to S3..."
    aws s3 sync out/ s3://$S3_BUCKET

    echo "Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
}

# メイン処理
update_stack
get_resource_info
build_and_deploy

echo "Deployment completed successfully!"