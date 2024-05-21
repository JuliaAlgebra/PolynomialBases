var documenterSearchIndex = {"docs":
[{"location":"","page":"Introduction","title":"Introduction","text":"CurrentModule = MultivariateBases\nDocTestSetup = quote\n    using MultivariateBases\nend","category":"page"},{"location":"#MultivariateBases","page":"Introduction","title":"MultivariateBases","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"MultivariateBases.jl is a standardized API for multivariate polynomial bases based on the MultivariatePolynomials API.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"AbstractPolynomialBasis\nmaxdegree_basis\nbasis_covering_monomials","category":"page"},{"location":"#MultivariateBases.AbstractPolynomialBasis","page":"Introduction","title":"MultivariateBases.AbstractPolynomialBasis","text":"abstract type AbstractPolynomialBasis end\n\nPolynomial basis of a subspace of the polynomials [Section~3.1.5, BPT12].\n\n[BPT12] Blekherman, G.; Parrilo, P. A. & Thomas, R. R. Semidefinite Optimization and Convex Algebraic Geometry. Society for Industrial and Applied Mathematics, 2012.\n\n\n\n\n\n","category":"type"},{"location":"#MultivariateBases.maxdegree_basis","page":"Introduction","title":"MultivariateBases.maxdegree_basis","text":"maxdegree_basis(B::Type{<:AbstractPolynomialBasis}, variables, maxdegree::Int)\n\nReturn the basis of type B generating all polynomials of degree up to maxdegree with variables variables.\n\n\n\n\n\n","category":"function"},{"location":"#MultivariateBases.basis_covering_monomials","page":"Introduction","title":"MultivariateBases.basis_covering_monomials","text":"basis_covering_monomials(B::Type{<:AbstractPolynomialBasis}, monos::AbstractVector{<:AbstractMonomial})\n\nReturn the minimal basis of type B that can generate all polynomials of the monomial basis generated by monos.\n\nExamples\n\nFor example, to generate all the polynomials with nonzero coefficients for the monomials x^4 and x^2, we need three polynomials as otherwise, we generate polynomials with nonzero constant term.\n\njulia> using DynamicPolynomials\n\njulia> @polyvar x\n(x,)\n\njulia> basis_covering_monomials(Chebyshev, [x^2, x^4])\nSubBasis{ChebyshevFirstKind}([1, x², x⁴])\n\n\n\n\n\n","category":"function"},{"location":"#Monomial-basis","page":"Introduction","title":"Monomial basis","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Monomial\nScaledMonomial","category":"page"},{"location":"#MultivariateBases.Monomial","page":"Introduction","title":"MultivariateBases.Monomial","text":"struct Monomial <: AbstractMonomialIndexed end\n\nMonomial basis with the monomials of the vector monomials. For instance, SubBasis{Monomial}([1, x, y, x^2, x*y, y^2]) is the monomial basis for the subspace of quadratic polynomials in the variables x, y.\n\nThis basis is orthogonal under a scalar product defined with the complex Gaussian measure as density. Once normalized so as to be orthonormal with this scalar product, one get ths ScaledMonomial.\n\n\n\n\n\n","category":"type"},{"location":"#MultivariateBases.ScaledMonomial","page":"Introduction","title":"MultivariateBases.ScaledMonomial","text":"struct Scaled <: AbstractMonomial end\n\nScaled monomial basis (see [Section 3.1.5, BPT12]) with the monomials of the vector monomials. Given a monomial x^alpha = x_1^alpha_1 cdots x_n^alpha_n of degree d = sum_i=1^n alpha_i, the corresponding polynomial of the basis is\n\nd choose alpha^frac12 x^alpha quad text where  quad\nd choose alpha = fracdalpha_1 alpha_2 cdots alpha_n\n\nFor instance, create a polynomial with the basis xy^2 xy creates the polynomial sqrt3 a xy^2 + sqrt2 b xy where a and b are new JuMP decision variables. Constraining the polynomial axy^2 + bxy to be zero with the scaled monomial basis constrains a/√3 and b/√2 to be zero.\n\nThis basis is orthonormal under the scalar product:\n\nlangle f g rangle = int_mathcalC^n f(z) overlineg(z) dnu_n\n\nwhere nu_n is the Gaussian measure on mathcalC^n with the density pi^-n exp(-lVert z rVert^2). See [Section 4; B07] for more details.\n\n[BPT12] Blekherman, G.; Parrilo, P. A. & Thomas, R. R. Semidefinite Optimization and Convex Algebraic Geometry. Society for Industrial and Applied Mathematics (2012).\n\n[B07] Barvinok, Alexander. Integration and optimization of multivariate polynomials by restriction onto a random subspace. Foundations of Computational Mathematics 7.2 (2007): 229-244.\n\n\n\n\n\n","category":"type"},{"location":"#Orthogonal-basis","page":"Introduction","title":"Orthogonal basis","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"AbstractMultipleOrthogonal\nunivariate_orthogonal_basis\nreccurence_first_coef\nreccurence_second_coef\nreccurence_third_coef\nreccurence_deno_coef\nProbabilistsHermite\nPhysicistsHermite\nLaguerre\nAbstractGegenbauer\nLegendre\nChebyshevFirstKind\nChebyshevSecondKind","category":"page"},{"location":"#MultivariateBases.AbstractMultipleOrthogonal","page":"Introduction","title":"MultivariateBases.AbstractMultipleOrthogonal","text":"abstract type AbstractMultipleOrthogonal <: AbstractMonomialIndexed end\n\nPolynomial basis such that langle p_i(x) p_j(x) rangle = 0 if i neq j where\n\nlangle p(x) q(x) rangle = int p(x)q(x) w(x) dx\n\nwhere the weight is a product of weight functions w(x) = w_1(x_1)w_2(x_2) cdots w_n(x_n) in each variable. The polynomial of the basis are product of univariate polynomials: p(x) = p_1(x_1)p_2(x_2) cdots p_n(x_n). where the univariate polynomials of variable x_i form an univariate orthogonal basis for the weight function w_i(x_i). Therefore, they satisfy the recurrence relation\n\nd_k p_k(x_i) = (a_k x_i + b_k) p_k-1(x_i) + c_k p_k-2(x_i)\n\nwhere reccurence_first_coef gives a_k, reccurence_second_coef gives b_k, reccurence_third_coef gives c_k and reccurence_deno_coef gives d_k.\n\n\n\n\n\n","category":"type"},{"location":"#MultivariateBases.univariate_orthogonal_basis","page":"Introduction","title":"MultivariateBases.univariate_orthogonal_basis","text":"univariate_orthogonal_basis(\n    B::Type{<:AbstractMultipleOrthogonal},\n    variable::MP.AbstractVariable,\n    degree::Integer,\n)\n\nReturn the vector of univariate polynomials of the basis B up to degree with variable variable.\n\n\n\n\n\n","category":"function"},{"location":"#MultivariateBases.reccurence_first_coef","page":"Introduction","title":"MultivariateBases.reccurence_first_coef","text":"reccurence_first_coef(B::Type{<:AbstractMultipleOrthogonal}, degree::Integer)\n\nReturn a_{degree} in recurrence equation\n\nd_k p_k(x_i) = (a_k x_i + b_k) p_k-1(x_i) + c_k p_k-2(x_i)\n\n\n\n\n\n","category":"function"},{"location":"#MultivariateBases.reccurence_second_coef","page":"Introduction","title":"MultivariateBases.reccurence_second_coef","text":"reccurence_second_coef(B::Type{<:AbstractMultipleOrthogonal}, degree::Integer)\n\nReturn b_{degree} in recurrence equation\n\nd_k p_k(x_i) = (a_k x_i + b_k) p_k-1(x_i) + c_k p_k-2(x_i)\n\n\n\n\n\n","category":"function"},{"location":"#MultivariateBases.reccurence_third_coef","page":"Introduction","title":"MultivariateBases.reccurence_third_coef","text":"reccurence_third_coef(B::Type{<:AbstractMultipleOrthogonal}, degree::Integer)\n\nReturn c_{degree} in recurrence equation\n\nd_k p_k(x_i) = (a_k x_i + b_k) p_k-1(x_i) + c_k p_k-2(x_i)\n\n\n\n\n\n","category":"function"},{"location":"#MultivariateBases.reccurence_deno_coef","page":"Introduction","title":"MultivariateBases.reccurence_deno_coef","text":"reccurence_deno_coef(B::Type{<:AbstractMultipleOrthogonal}, degree::Integer)\n\nReturn d_{degree} in recurrence equation\n\nd_k p_k(x_i) = (a_k x_i + b_k) p_k-1(x_i) + c_k p_k-2(x_i)\n\n\n\n\n\n","category":"function"},{"location":"#MultivariateBases.ProbabilistsHermite","page":"Introduction","title":"MultivariateBases.ProbabilistsHermite","text":"struct ProbabilistsHermiteBasis{P} <: AbstractHermiteBasis{P}\n    polynomials::Vector{P}\nend\n\nOrthogonal polynomial with respect to the univariate weight function w(x) = exp(-x^22) over the interval -infty infty.\n\n\n\n\n\n","category":"type"},{"location":"#MultivariateBases.PhysicistsHermite","page":"Introduction","title":"MultivariateBases.PhysicistsHermite","text":"struct PhysicistsHermite{P} <: AbstractHermite{P}\n    polynomials::Vector{P}\nend\n\nOrthogonal polynomial with respect to the univariate weight function w(x) = exp(-x^2) over the interval -infty infty.\n\n\n\n\n\n","category":"type"},{"location":"#MultivariateBases.Laguerre","page":"Introduction","title":"MultivariateBases.Laguerre","text":"struct LaguerreBasis <: AbstractMultipleOrthogonal end\n\nOrthogonal polynomial with respect to the univariate weight function w(x) = exp(-x) over the interval 0 infty.\n\n\n\n\n\n","category":"type"},{"location":"#MultivariateBases.AbstractGegenbauer","page":"Introduction","title":"MultivariateBases.AbstractGegenbauer","text":"struct AbstractGegenbauer <: AbstractMultipleOrthogonal end\n\nOrthogonal polynomial with respect to the univariate weight function w(x) = (1 - x^2)^alpha - 12 over the interval -1 1.\n\n\n\n\n\n","category":"type"},{"location":"#MultivariateBases.Legendre","page":"Introduction","title":"MultivariateBases.Legendre","text":"struct Legendre <: AbstractGegenbauer end\n\nOrthogonal polynomial with respect to the univariate weight function w(x) = 1 over the interval -1 1.\n\n\n\n\n\n","category":"type"},{"location":"#MultivariateBases.ChebyshevFirstKind","page":"Introduction","title":"MultivariateBases.ChebyshevFirstKind","text":"struct ChebyshevFirstKind <: AbstractChebyshev end\n\nOrthogonal polynomial with respect to the univariate weight function w(x) = frac1sqrt1 - x^2 over the interval -1 1.\n\n\n\n\n\n","category":"type"},{"location":"#MultivariateBases.ChebyshevSecondKind","page":"Introduction","title":"MultivariateBases.ChebyshevSecondKind","text":"struct ChebyshevSecondKind <: AbstractChebyshevBasis end\n\nOrthogonal polynomial with respect to the univariate weight function w(x) = sqrt1 - x^2 over the interval -1 1.\n\n\n\n\n\n","category":"type"}]
}
