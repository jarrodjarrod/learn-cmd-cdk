import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class WorkshopJmStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myBucket = new s3.Bucket(this, "myBucket", {
      bucketName: "workshop-cdk-typescript-jm",
    });

    const myLambda = new lambda.Function(this, "myLambda", {
      code: lambda.Code.fromAsset("./handler"),
      handler: "lambda_function.lambda_handler",
      runtime: lambda.Runtime.PYTHON_3_9,
    });

    myBucket.grantReadWrite(myLambda);
  }
}
