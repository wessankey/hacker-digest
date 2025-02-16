import admin from "firebase-admin";
import {
  App,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Story } from "../hackernews/types";
import { CommentSummary } from "../summary/schema";

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40udemy-firebase-9a194.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
} as ServiceAccount;

let app: App;

const currentApps = getApps();

if (currentApps.length === 0) {
  app = initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  app = currentApps[0];
}

export const firestore = getFirestore(app);

export async function createStory(story: Story) {
  const docRef = firestore.collection("summary").doc(story.id.toString());
  const doc = await docRef.get();

  if (doc.exists) return;

  try {
    const createdStory = await firestore
      .collection("summary")
      .doc(story.id.toString())
      .set(story);

    console.log("Story created", createdStory);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getStory(storyId: string) {
  const docRef = firestore.collection("summary").doc(storyId);
  const doc = await docRef.get();
  return doc.data();
}

export async function getSummary(
  storyId: number
): Promise<CommentSummary | null> {
  const docRef = firestore.collection("summary").doc(storyId.toString());
  const doc = await docRef.get();
  return doc.data() as CommentSummary | null;
}

export async function createSummary(storyId: number, summary: CommentSummary) {
  const docRef = firestore.collection("summary").doc(storyId.toString());
  const doc = await docRef.get();

  if (doc.exists) return;

  try {
    const createdSummary = await firestore
      .collection("summary")
      .doc(storyId.toString())
      .set(summary);

    console.log("Summary created", createdSummary);
  } catch (error) {
    console.error("Error creating summary:", error);
    throw error;
  }
}
