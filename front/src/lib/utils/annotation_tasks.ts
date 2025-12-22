import type { AnnotationStatus, AnnotationTask } from "@/lib/types";

export function getAnnotationTaskStatus(
  task: AnnotationTask,
): AnnotationStatus | "pending" {
  let status_badges = task.status_badges;

  if (status_badges == null) {
    return "pending";
  }

  if (status_badges.length === 0) {
    return "pending";
  }

  let isVerified = false;
  let isCompleted = false;
  let needsReview = false;

  status_badges.forEach(({ state }) => {
    switch (state) {
      case "verified":
        isVerified = true;
        break;
      case "rejected":
        needsReview = true;
        break;
      case "completed":
        isCompleted = true;
        break;
    }
  });

  if (needsReview) {
    return "rejected";
  }

  if (isVerified) {
    return "verified";
  }

  if (isCompleted) {
    return "completed";
  }

  return "pending";
}

export function computeAnnotationTasksProgress(
  annotationTasks: AnnotationTask[],
) {
  let missing = 0;
  let needReview = 0;
  let completed = 0;
  let verified = 0;
  for (const task of annotationTasks) {
    let isVerified = false;
    let isCompleted = false;
    let needsReview = false;

    task.status_badges?.forEach(({ state }) => {
      switch (state) {
        case "verified":
          isVerified = true;
          break;
        case "rejected":
          needsReview = true;
          break;
        case "completed":
          isCompleted = true;
          break;
      }
    });

    if (isVerified && !needsReview) {
      verified += 1;
    }

    if (isCompleted && !needsReview) {
      completed += 1;
    }

    if (!isCompleted) {
      missing += 1;
    }

    if (needsReview) {
      needReview += 1;
    }
  }
  return {
    missing,
    needReview,
    completed,
    verified,
    total: annotationTasks.length,
  };
}
