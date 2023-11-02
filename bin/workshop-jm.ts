#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { WorkshopJmStack } from "../lib/workshop-jm-stack";
import { NetworkJmStack } from "../lib/network-jm-stack";
import { AlbEcsGlStack } from "../lib/alb-ecs-jm-stack";

const app = new cdk.App();

// Note: What we are adding here is the tryGetContext method. It allows us to pass a specific
// variable from the CLI, in this case called region. From here on out, we will need add -c
// region={yourRegion} at the end of our synth/deploys.
// const region = app.node.tryGetContext("region") ?? process.env.CDK_DEFAULT_REGION;
// const account = "277756974081";

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new WorkshopJmStack(app, "WorkshopJmStack", { env });
new NetworkJmStack(app, "NetworkJmStack", { env });
new AlbEcsGlStack(app, "AlbEcsJmStack", { env });

/* If you don't specify 'env', this stack will be environment-agnostic.
 * Account/Region-dependent features and context lookups will not work,
 * but a single synthesized template can be deployed anywhere. */
/* Uncomment the next line to specialize this stack for the AWS Account
 * and Region that are implied by the current CLI configuration. */
// env: {
//   account: process.env.CDK_DEFAULT_ACCOUNT,
//   region: process.env.CDK_DEFAULT_REGION,
// },
/* Uncomment the next line if you know exactly what Account and Region you
 * want to deploy the stack to. */
// env: { account: "277756974081", region: "ap-southeast-2" },
/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
