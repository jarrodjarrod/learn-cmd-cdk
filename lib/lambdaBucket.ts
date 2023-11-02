import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface Props {
  bucketName: string;
  pathToCode: string;
}

export class LambdaBucket extends Construct {
  public readonly bucket: s3.Bucket;
  public readonly lambda: lambda.Function;

  constructor(scope: Construct, id: string, { pathToCode, bucketName }: Props) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, "myBucket", { bucketName });

    this.lambda = new lambda.Function(this, "myLambda", {
      code: lambda.Code.fromAsset(pathToCode),
      handler: "lambda_function.lambda_handler",
      runtime: lambda.Runtime.PYTHON_3_9,
    });

    this.bucket.grantReadWrite(this.lambda);
  }
}
