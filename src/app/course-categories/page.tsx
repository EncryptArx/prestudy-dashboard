
"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Edit, Trash2, Search, Package } from "lucide-react";
import { usePageTitle } from '@/contexts/PageTitleContext';
import { mockCourseCategories, type CourseCategory } from "@/data/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CourseCategoriesPage() {
  const { setPageTitle } = usePageTitle();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categories, setCategories] = React.useState<CourseCategory[]>(mockCourseCategories);

  React.useEffect(() => {
    setPageTitle("Course Categories");
  }, [setPageTitle]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Placeholder for add/edit functionality
  const handleAddCategory = (newCategory: Omit<CourseCategory, 'id' | 'lastUpdated'>) => {
    const createdCategory: CourseCategory = {
      ...newCategory,
      id: `ccat${categories.length + 1}`,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setCategories(prev => [...prev, createdCategory]);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground md:hidden">Course Categories</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Course Category</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new course category.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAddCategory({
                  name: formData.get('name') as string,
                  description: formData.get('description') as string,
                  quizCount: parseInt(formData.get('quizCount') as string) || 0,
                  imageUrl: formData.get('imageUrl') as string || 'https://placehold.co/300x200.png',
                  imageHint: formData.get('imageHint') as string || 'course category',
                });
                // TODO: Close dialog, clear form
              }}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" name="name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Textarea id="description" name="description" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quizCount" className="text-right">Quiz Count</Label>
                    <Input id="quizCount" name="quizCount" type="number" defaultValue="0" className="col-span-3" />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
                    <Input id="imageUrl" name="imageUrl" placeholder="https://placehold.co/300x200.png" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imageHint" className="text-right">Image Hint</Label>
                    <Input id="imageHint" name="imageHint" placeholder="e.g. science book" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Category</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                  data-ai-hint={category.imageHint}
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg mb-2">{category.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-3 h-20 overflow-hidden text-ellipsis">
                  {category.description}
                </CardDescription>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Package className="mr-1.5 h-3.5 w-3.5" />
                  <span>{category.quizCount} Quizzes</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t flex justify-between items-center">
                <p className="text-xs text-muted-foreground">Updated: {category.lastUpdated}</p>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit Category</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/80">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete Category</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-lg">
          <CardContent className="p-10 text-center">
            <p className="text-muted-foreground">No course categories found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
