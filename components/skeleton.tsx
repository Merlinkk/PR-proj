import { CardContent } from "./ui/card";



export function CardsSkeleton() {
    return (
        <>
            <CardContent>
                <div className="rounded-md border border-white/10 overflow-hidden animate-pulse">
                    {/* Header */}
                    <div className="grid grid-cols-12 bg-white/10 p-4 gap-4">
                        <div className="col-span-1 font-medium">#</div>
                        <div className="col-span-4 font-medium">Project Name</div>
                        <div className="col-span-2 font-medium">Category</div>
                        <div className="col-span-2 font-medium">Status</div>
                        <div className="col-span-3 font-medium text-right">Actions</div>
                    </div>

                    {/* Skeleton Rows */}
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="grid grid-cols-12 p-4 gap-4 border-t border-white/10">
                            <div className="col-span-1">
                                <div className="h-4 w-4 bg-white/20 rounded" />
                            </div>
                            <div className="col-span-4">
                                <div className="h-4 w-3/4 bg-white/20 rounded" />
                            </div>
                            <div className="col-span-2">
                                <div className="h-4 w-2/3 bg-white/20 rounded" />
                            </div>
                            <div className="col-span-2">
                                <div className="h-4 w-1/2 bg-white/20 rounded" />
                            </div>
                            <div className="col-span-3 flex justify-end space-x-2">
                                <div className="h-4 w-6 bg-white/20 rounded" />
                                <div className="h-4 w-6 bg-white/20 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>

        </>
    );
}