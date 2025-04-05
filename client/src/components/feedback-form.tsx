import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<"helpful" | "not-helpful" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    // In a production app, this would send the feedback to the server
    console.log("Feedback submitted:", { rating, feedback });
    
    // Show success message
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });
    
    // Reset form
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Thank You!</CardTitle>
          <CardDescription>Your feedback has been submitted successfully.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Feedback</CardTitle>
        <CardDescription>
          Was this company information helpful for your interview preparation?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 justify-center">
          <Button
            variant={rating === "helpful" ? "default" : "outline"}
            className={`w-1/2 ${rating === "helpful" ? "" : "text-gray-600"}`}
            onClick={() => setRating("helpful")}
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            Helpful
          </Button>
          <Button
            variant={rating === "not-helpful" ? "default" : "outline"}
            className={`w-1/2 ${rating === "not-helpful" ? "" : "text-gray-600"}`}
            onClick={() => setRating("not-helpful")}
          >
            <ThumbsDown className="mr-2 h-4 w-4" />
            Not Helpful
          </Button>
        </div>
        
        <div>
          <Textarea
            placeholder="Please provide any additional feedback to help us improve..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={!rating}
          className="w-full"
        >
          Submit Feedback
        </Button>
      </CardFooter>
    </Card>
  );
}