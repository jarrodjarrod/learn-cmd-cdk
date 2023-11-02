import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ssm from "aws-cdk-lib/aws-ssm";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";

export class AlbEcsGlStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpcId = ssm.StringParameter.valueFromLookup(
      this,
      "/workshop/VpcIdJm"
    );

    const vpc = ec2.Vpc.fromLookup(this, "ecsVpc", { vpcId });

    new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      "AlbEcsService",
      {
        vpc,
        listenerPort: 80,
        memoryLimitMiB: 512,
        publicLoadBalancer: true,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry(
            "https://hub.docker.com/_/nginx"
          ),
        },
      }
    );
  }
}
