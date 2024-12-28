import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Story } from "../hackernews/types";
import { CommentSummary } from "../summary/schema";

const alreadyCreatedAps = getApps();

if (alreadyCreatedAps.length === 0) {
  initializeApp({
    credential: cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });
}

const db = getFirestore();

export async function createStory(story: Story) {
  const docRef = db.collection("summary").doc(story.id.toString());
  const doc = await docRef.get();

  if (doc.exists) return;

  try {
    const createdStory = await db
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
  const docRef = db.collection("summary").doc(storyId);
  const doc = await docRef.get();
  return doc.data();
}

export async function getSummary(
  storyId: number
): Promise<CommentSummary | null> {
  const docRef = db.collection("summary").doc(storyId.toString());
  const doc = await docRef.get();
  return doc.data() as CommentSummary | null;
}

export async function createSummary(storyId: number, summary: CommentSummary) {
  const docRef = db.collection("summary").doc(storyId.toString());
  const doc = await docRef.get();

  if (doc.exists) return;

  try {
    const createdSummary = await db
      .collection("summary")
      .doc(storyId.toString())
      .set(summary);

    console.log("Summary created", createdSummary);
  } catch (error) {
    console.error("Error creating summary:", error);
    throw error;
  }
}
